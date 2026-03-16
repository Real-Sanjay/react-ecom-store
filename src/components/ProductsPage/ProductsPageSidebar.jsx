import './ProductsPageSidebar.css'
import IconWithLink from './../IconWithLink/IconWithLink';
import useData from '../../hooks/useData';
import { span } from 'motion/react-client';
import { Link } from 'react-router-dom';
const ProductsPageSidebar = () => {

  const {data, error} = useData("/category", "categories");

  return (
    <aside className="product_page_category">
            <h2>Categories</h2>
            {error && <p>There was an error loading the categories: {error.message}</p>}
          <div className="category_container">
           {data &&  data?.map((category) => {
              return <IconWithLink sidebar link={`?category=${category.name}`} key={category._id} title={category.name} />
           })}
          </div>
        </aside>
  )
}

export default ProductsPageSidebar