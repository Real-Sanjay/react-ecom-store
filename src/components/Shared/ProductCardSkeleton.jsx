import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card">
      <Skeleton height={180} borderRadius={8} />
      <Skeleton height={16} style={{ marginTop: 10 }} />
      <Skeleton width="40%" height={16} />
      <Skeleton height={36} borderRadius={8} style={{ marginTop: 12 }} />
    </div>
  );
};

export default ProductCardSkeleton;
