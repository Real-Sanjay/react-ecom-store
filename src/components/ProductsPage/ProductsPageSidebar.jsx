import './ProductsPageSidebar.css'
import IconWithLink from './../IconWithLink/IconWithLink';
import useData from '../../hooks/useData';
const ProductsPageSidebar = () => {

  const {data, error} = useData("/category");


  return (
    <aside className="product_page_category">
            <h2>Categories</h2>
            {error && <p>There was an error loading the categories: {error.message}</p>}
           {data &&  data?.map((category) => {
              return <IconWithLink link={`?category=${category.name}`} key={category._id} icon={`http://localhost:5000/category/${category.image}`} title={category.name}  />
           })}
        </aside>
  )
}

export default ProductsPageSidebar