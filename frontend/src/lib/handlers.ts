interface Sort {
  product: any;
  searchval: string;
  sortKey: { key: string; direction: string };
  rangeVal: number[];
}

export function getSortedProducts({
  product,
  searchval,
  sortKey,
  rangeVal,
}: Sort) {
  if (searchval) {
    const p = product.filter((p: any) =>
      p.name.toLowerCase().includes(searchval.toLowerCase()),
    );
    return p;
  }
  if (sortKey.key === "s_price") {
    const p = product.filter(
      (p: { price: number }) =>
        p.price >= rangeVal[0] && p.price <= rangeVal[1],
    );
    return p;
  }
  if (sortKey.direction === "asc") {
    if (sortKey.key === "name" || sortKey.key === "createdAt") {
      return product.sort((a: any, b: any) =>
        a[sortKey.key].localeCompare(b[sortKey.key]),
      );
    }
    return product.sort((a: any, b: any) => a[sortKey.key] - b[sortKey.key]);
  }
  return sortKey.key === "name" || sortKey.key === "createdAt"
    ? product.sort((a: any, b: any) =>
        b[sortKey.key].localeCompare(a[sortKey.key]),
      )
    : product.sort((a: any, b: any) => b[sortKey.key] - a[sortKey.key]);
}
