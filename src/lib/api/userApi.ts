import { decrypt, decryptStr, encrypt } from 'lib/crypto';

//signin
export function userSignIn({ id, password }: { id: string; password: string }) {
  const users = localStorage.getItem('users');

  if (users) {
    const decryptedData = decrypt({ data: users });
    console.log(decryptedData);
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
  const encryptedPW = encrypt({ data: password });
  if (users) {
    const decryptedData = decrypt({ data: users });
    const userFind =
      decryptedData &&
      decryptedData.user.filter((data: { id: string; password: string; name: string }) => data.id === id)[0];

    if (userFind) {
      return { data: { result: 400, message: 'existed data' } };
    } else {
      console.log(decryptedData);
      decryptedData.user.push({ id, password: encryptedPW, name });
      const encrypted = encrypt({ data: JSON.stringify(decryptedData) });
      encrypted && localStorage.setItem('users', encrypted);

      return { data: { result: 200 } };
    }
  } else {
    const encrypted = encrypt({
      data: JSON.stringify({ user: [{ id, password: encryptedPW, name }] }),
    });
    encrypted && localStorage.setItem('users', encrypted);
    return { data: { result: 200 } };
  }
}
