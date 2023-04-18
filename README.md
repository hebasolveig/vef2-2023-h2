# Vefforitun 2 2023 Hópverkefni 2

Þetta verkefni var unnið af:

Birgitta Ýr Eyþórsdóttir (bye1@hi.is) (github: Birgittaye)

Heba Solveig Heimisdóttir (hsh58@hi.is) (github: hebasolveig)

Hrefna Karen Valgarðsdóttir (hkv5@hi.is) (github: applemuffinhead)

## Verkefnið sjálft

Þetta er vefsíða sem heldur utan um  mynbönd.

Það er hægt að búa til account en ekki hægt að setja neitt inní gagnagrunn. Við vorum að lenda í vandamáli með að gera það. 

Eini sem að ætti að geta sett upp myndböndum (hefði það virkað) er admin.

### Admin

notendanafn: admin

lykilorð: 1234567890

### Áður en er byrjað (setup)

Það getti þurft að setja upp hluti með:

```bash
npm install
```
Setja þarf **NEXT_PUBLIC_API_URL** í **.env** sem bendir á hopverkefni 1 okkar. 

Það er uppi á railway: [https://vef2-2023-h1-production-e699.up.railway.app/](https://vef2-2023-h1-production-e699.up.railway.app/).

.env:
```bash
NEXT_PUBLIC_API_URL="https://vef2-2023-h1-production-e699.up.railway.app/"
```

### Kvekja á forritinu (run)

```bash
npm run dev
```

Opnið svo localhost á því porti sem að var notað (búist er við að það er á porti 3000: [http://localhost:3000](http://localhost:3000) )

## Auka tæki og tól

### Lint

```bash
npm run lint
```

