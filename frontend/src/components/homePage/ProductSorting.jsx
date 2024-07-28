import { Col, Form } from 'react-bootstrap';
import { capitalize } from 'lodash';

const ProductSorting = ({ sort, setSort }) => {
  return (
    <Col sm={12} lg={4}>
      <Form.Control
        as='select'
        value={`Sort Product By: ${sort}`}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value='date'>{`Sort Product By: ${capitalize(sort)}`}</option>
        <option value='name'>Name </option>
        <option value='price'>Price </option>
        <option value='rating'> Rating </option>
        <option value='inStock'> In Stock </option>
        <option value='date'> Date </option>
      </Form.Control>
    </Col>
  );
};

export default ProductSorting;
