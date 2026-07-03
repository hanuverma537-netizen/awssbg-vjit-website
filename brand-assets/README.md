# Brand assets

Source of truth for AWS SBG VJIT visual identity. Nothing here is generated; drop
real files in and record where each came from.

## fonts/

Amazon Ember family (licensed). Place the `.ttf` files here from the official AWS
brand kit, then copy them into `public/fonts/` so the `@font-face` rules in
`src/app/globals.css` can serve them. Expected filenames:

- `AmazonEmberDisplay_Lt.ttf` (300)
- `AmazonEmberDisplay_Rg.ttf` (400)
- `AmazonEmberDisplay_Md.ttf` (500)
- `AmazonEmberDisplay_Bd.ttf` (700)
- `AmazonEmberDisplay_He.ttf` (900)
- `AmazonEmberMono_Rg.ttf` (400)
- `AmazonEmberMono_Bd.ttf` (700)
- `Amazon Ember Duospace.ttf` (400)
- `Amazon Ember Duospace Bold.ttf` (700)

Until these land, the site falls back to a system sans/mono stack. Nothing breaks.

## logos/

AWS SBG brandmark in SVG and PNG. Do not use the AWS corporate logo unless the
variant is explicitly approved by AWS.

## icons/

AWS SBG icon set consumed by `components/brand/BrandIcon.tsx`.
