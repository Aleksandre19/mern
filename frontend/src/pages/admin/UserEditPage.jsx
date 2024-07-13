import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import useUserEditPage from '../../hooks/admin/useUserEditPage';

const UserEditPage = () => {
  // Component based state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Current component custom hook
  const { submitHandler, userLoading, updateLoading } = useUserEditPage(
    name,
    setName,
    email,
    setEmail,
    isAdmin,
    setIsAdmin
  );

  // Handle loading
  if (userLoading) return <Loader />;

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      {updateLoading && <Loader />}

      <FormContainer>
        <h1>Edit user</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-2' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-4'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditPage;
