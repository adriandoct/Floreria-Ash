import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

// Configuración de Stripe con la clave secreta proporcionada
const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string || 'mk_1PfD56P3zWNMANgdmtdfA5Ei', {
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejo de pre-flight CORS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { productId } = await req.json()

    if (!productId) {
      throw new Error('El productId es requerido')
    }

    // Inicializar el cliente de Supabase usando las credenciales del entorno Edge
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Obtener detalles del producto de la base de datos para no confiar en el precio del frontend
    const { data: product, error } = await supabaseClient
      .from('products')
      .select('price')
      .eq('id', productId)
      .single()

    if (error || !product) {
      throw new Error('Producto no encontrado')
    }

    // Crear un PaymentIntent en Stripe. El monto debe ser en centavos (ej. 100 MXN = 10000)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(product.price * 100), 
      currency: 'mxn',
    })

    // Devolver el client_secret al frontend
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
