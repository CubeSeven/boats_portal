#!/bin/bash
mkdir -p public/images/fleet

declare -A boats
# Source 1
boats["axopar-brabus"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/Axopar-brabus1.jpg"
boats["karel-paxos"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/karel-delux.jpg"
boats["karel-odussea"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/odys-prem.resized.webp"
boats["karel-pacific"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/GR-Boat-Rental-Skiathos-Karel-Luxury-Edition-2024-1.jpg"
boats["karel-ithaca-90hp"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/ithaka-5.jpg"
boats["karel-sporades"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/IMG_5164-scaled.jpg"
boats["tiger-topline"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/tiger-prem.jpg"
boats["tiger-proline-740"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/proline-2.jpg"
boats["tomahawk-rib"]="https://skiathosboatsrental.gr/wp-content/uploads/2026/01/tomhawk.resized.jpg"

# Source 2
boats["legenf-a40"]="https://skiathosprivetrips.travelotopos.com/image/22/1000/665"
boats["genesis-33"]="https://skiathosprivetrips.travelotopos.com/image/20/1000/665"
boats["tiger-marine-open-850"]="https://skiathosprivetrips.travelotopos.com/image/1/1000/665"
boats["rafael-marinello-eden"]="https://skiathosprivetrips.travelotopos.com/image/2/1000/665"
boats["karel-ithaca-50hp"]="https://skiathosprivetrips.travelotopos.com/image/3/1000/665"
boats["black-edition-nireus"]="https://skiathosprivetrips.travelotopos.com/image/16/1000/665"
boats["quicksilver-activ-555"]="https://skiathosprivetrips.travelotopos.com/image/4/1000/665"

# User-Agent to avoid blocks
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

for slug in "${!boats[@]}"; do
    url="${boats[$slug]}"
    ext="jpg"
    if [[ $url == *".webp"* ]]; then ext="webp"; fi
    if [[ $url == *".jpeg"* ]]; then ext="jpg"; fi
    
    echo "Downloading $slug..."
    curl -L -s -A "$UA" -o "public/images/fleet/$slug.$ext" "$url"
done
