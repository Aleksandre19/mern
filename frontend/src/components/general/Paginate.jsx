import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Col } from 'react-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = '',
}) => {
  return (
    pages > 1 && (
      <Col sm={12}>
        <Pagination>
          {[...Array(pages).keys()].map((p) => (
            <LinkContainer
              key={p + 1}
              // to={
              //   !isAdmin
              //     ? keyword
              //       ? `/search/${keyword}/page/${p + 1}`
              //       : `/page/${p + 1}`
              //         ? category
              //           ? `/category/${category}/page/${p + 1}`
              //           : `/page/${p + 1}`
              //     : `/admin/productlist/${p + 1}`
              // }
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${p + 1}`
                    : category
                      ? `/category/${category}/page/${p + 1}`
                      : `/page/${p + 1}`
                  : `/admin/productlist/${p + 1}`
              }
            >
              <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </Col>
    )
  );
};

export default Paginate;
