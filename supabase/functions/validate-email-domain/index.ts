// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { allowedOrigins } from '../_shared/cors.ts'

const ACCEPTED_EMAIL_DOMAINS = Deno.env.get('ACCEPTED_EMAIL_DOMAINS_CSV').split(',');

function validateCorsOrigin(req) {
  let corsHeaders = {}
  const origin = req.headers.get('origin')
  if (!origin) {
    console.log('No origin header from' + req.url)
  }
  else if (allowedOrigins.includes(origin)) {
    corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }
  } else {
    console.error('Invalid origin: ' + origin + ' for ' + req.url)
  }

  return corsHeaders
}

function validateEmailDomain(emailDomain: string) {
  return ACCEPTED_EMAIL_DOMAINS.includes(emailDomain);
}

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  const corsHeaders = validateCorsOrigin(req)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  //console.log('cors headers: ' + corsHeaders["Access-Control-Allow-Headers"] + ' ' + corsHeaders["Access-Control-Allow-Origin"])

  try {
    const { domain } = await req.json()
    const isValid = validateEmailDomain(domain)
    const data = {
      valid: isValid,
    }

    //console.log('returning response' + data.valid)
    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    )
  } catch (error) {
    console.error('returning error response' + error.message)
    console.error('input value: ' + req.json().domain)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
