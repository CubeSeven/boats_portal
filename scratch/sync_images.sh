#!/bin/bash
mkdir -p public/images/fleet
for file in "Boat Images"/*; do
    filename=$(basename "$file")
    # Convert to lowercase
    newname=$(echo "$filename" | tr '[:upper:]' '[:lower:]')
    # Replace spaces with hyphens
    newname=$(echo "$newname" | sed 's/ /-/g')
    # Remove any extra chars but keep dots and hyphens
    newname=$(echo "$newname" | sed 's/[^a-z0-9.-]//g')
    # Ensure there is a hyphen before the number at the end if missing
    newname=$(echo "$newname" | sed -E 's/([a-z])([0-9])/\1-\2/g')
    
    echo "Copying $filename to $newname"
    cp "$file" "public/images/fleet/$newname"
done
