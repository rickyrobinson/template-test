import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import Metalsmith from 'metalsmith'
import inPlace from '@metalsmith/in-place'

const __dirname = dirname(fileURLToPath(import.meta.url))
const t1 = performance.now()

Metalsmith(__dirname)         // parent directory of this file
  .source('./src')            // source directory
  .destination('./build')     // destination directory
  .clean(true)                // clean destination before
  .env({                      // pass NODE_ENV & other environment variables
    DEBUG: process.env.DEBUG,
    NODE_ENV: process.env.NODE_ENV
  })           
  .metadata({                 // add any variable you want & use them in layout-files
    subtitle: "Chim chimney",
    author: "Some Guy",
    body: "It's about saying »Hello« to the world.",
  })
  .use(
  inPlace({
    transform: 'handlebars', // resolved
    extname: '.html',
    pattern: '**/*.{htm,html}*',
    engineOptions: {}
  }))
  .build((err) => {           // build process
    if (err) throw err        // error handling is required
    console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`)
  });
