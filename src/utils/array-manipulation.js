


function filterExistingDistrictBrands(allBrands, BrandsInDistrict) {
    const result = allBrands?.filter(brand => !BrandsInDistrict?.includes(brand.id));
    return result;
}

export { filterExistingDistrictBrands };