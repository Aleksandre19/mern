import Loader from '../components/general/Loader';
import useProfilePage from '../hooks/useProfilePage';

import { Profile } from '../components';
import { UpdateCredentials } from '../components';
import { UserOrdersList } from '../components';

const ProfilePage = () => {
  // Current component hook
  const {
    orders,
    submitHandler,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    updateProfileLoading,
    displayOrdersLoading,
    displayOrdersError,
  } = useProfilePage();

  // Handle loadings
  if (displayOrdersLoading) <Loader />;

  return (
    <Profile>
      <UpdateCredentials
        submitHandler={submitHandler}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isLoading={updateProfileLoading}
      />

      <UserOrdersList orders={orders} error={displayOrdersError} />
    </Profile>
  );
};

export default ProfilePage;
