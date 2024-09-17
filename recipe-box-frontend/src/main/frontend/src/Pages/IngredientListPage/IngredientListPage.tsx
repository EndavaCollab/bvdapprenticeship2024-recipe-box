import './IngredientListPage.css'
import SearchBar from "../../components/IngredientList/SearchBar";
import IngredientList from "../../components/IngredientList/IngredientList";
import Pagination from "../../components/IngredientList/Pagination";

const IngredientListPage: React.FC = () => {
    return (
      <div className="ingredient-list-page">
          <h1>Ingredient List</h1>
          <SearchBar />
          {/*<IngredientList />*/}
          {/*<Pagination />*/}
      </div>
    );
}

export default IngredientListPage;
