import { decrypt, decryptStr, encrypt } from 'lib/crypto';

//signin
export function userSignIn({ id, password }: { id: string; password: string }) {
  const users = localStorage.getItem('users');

  if (users) {
    const decryptedData = decrypt({ data: users });
    const userFind =
      decryptedData &&
      decryptedData.user.filter(
        (data: { id: string; password: string; name: string }) =>
          data.id === id && decryptStr({ data: data.password }) === password
      )[0];

    if (userFind) {
      return { data: { result: 200, data: { name: userFind.name, id: userFind.id } } };
    } else {
      return { data: { result: 400, message: 'no data' } };
    }
  } else {
    return { data: { result: 400, message: 'no data' } };
  }
}

//signup
export function userSignUp({ id, password, name }: { id: string; password: string; name: string }) {
  const users = localStorage.getItem('users');

  if (users) {
    const decryptedData = decrypt({ data: users });
    const userFind =
      decryptedData &&
      decryptedData.user.filter((data: { id: string; password: string; name: string }) => data.id === id)[0];

    if (userFind) {
      return { data: { result: 400, message: 'existed data' } };
    } else {
      const decryptedData = decrypt({ data: users });
      const usersArr = decryptedData.user.push({ id, password: encrypt({ data: password }), name });
      const encrypted = encrypt({ data: JSON.stringify({ user: usersArr }) });
      encrypted && localStorage.setItem('users', encrypted);

      return { data: { result: 200 } };
    }
  } else {
    const encrypted = encrypt({
      data: JSON.stringify({ user: [{ id, password: encrypt({ data: password }), name }] }),
    });
    encrypted && localStorage.setItem('users', encrypted);
    return { data: { result: 200 } };
  }
}
