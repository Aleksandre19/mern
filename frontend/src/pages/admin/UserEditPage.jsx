import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/general/Loader';
import Message from '../../components/general/Message';
import ButtonWithLoader from '../../components/general/ButtonWithLoader';
import FormContainer from '../../components/general/FormContainer';
import useUserEditPage from '../../hooks/admin/useUserEditPage';
import { toast } from 'react-toastify';

const UserEditPage = () => {
  // Component based state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Current component custom hook
  const { submitHandler, userLoading, updateLoading, userError } =
    useUserEditPage(name, setName, email, setEmail, isAdmin, setIsAdmin);

  // // Handle errorss
  if (userError) return <Message variant='danger'>{userError.data}</Message>;

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      {userLoading && <Loader />}

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

          <ButtonWithLoader
            loading={updateLoading}
            text='Updating'
            className='my-1'
          />
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditPage;
