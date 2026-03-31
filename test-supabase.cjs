const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
  console.log("Fetching a product...");
  const { data: products } = await supabase.from('products').select('*').limit(1);
  if (!products || products.length === 0) {
    console.log("No products found.");
    return;
  }
  
  const product = products[0];
  console.log(`Original price for ${product.name}: ${product.price}`);
  
  console.log("Updating price...");
  const { data, error } = await supabase
    .from("products")
    .update({ price: product.price + 1 })
    .eq("id", product.id)
    .select()
    .single();
    
  console.log("Update result:", { data, error });
}
testUpdate();
