#!/bin/bash
mkdir -p public/images/fleet

declare -A boats
boats["axopar-brabus"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/axopar-brabus-37-600x400.jpg"
boats["legenf-a40"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Legend-a40-yacht.jpg"
boats["genesis-33"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Tropida-Genesis-33.jpg"
boats["tiger-marine-open-850"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Tiger-Marine.jpg"
boats["tiger-topline"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/tiger-topline-850-600x400.jpg"
boats["tiger-proline-740"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/tiger-marine-proline-740-23-600x400.jpg"
boats["karel-odussea"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/karel-odyssea-600x400.jpg"
boats["tiger-top-line-200"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/tiger-topline-2024-600x400.jpg"
boats["karel-pacific"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/karel-f19-600x400.jpg"
boats["rafael-marinello-eden"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Marinello.jpg"
boats["karel-ithaca-90hp"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Ithaca.jpg"
boats["karel-ithaca-50hp"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/karel-ithaca-600x400.jpg"
boats["tomahawk-rib"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/tomahawk-rib-600x400.jpg"
boats["black-edition-nireus"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Nireus-Black-edition.jpg"
boats["karel-paxos"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/paxos-deluxe-2-600x400.jpg"
boats["quicksilver-activ-555"]="https://skiathosprivetrips.gr/wp-content/uploads/2023/03/Quicksilver.jpg"
boats["karel-sporades"]="https://skiathosboatsrental.gr/wp-content/uploads/2024/02/karel-sporades-600x400.jpg"

for slug in "${!boats[@]}"; do
    url="${boats[$slug]}"
    echo "Downloading $slug from $url..."
    curl -s -o "public/images/fleet/$slug.jpg" "$url"
done
