export const validaNome = (nome) => {
  return nome?.length > 10;
};
export const validaNomeUsuario = (nomeUsuario) => {
  return nomeUsuario?.length > 5;
};

export const validaEmail = (email) => {
  return email?.length > 5 && email?.includes('@') && email?.includes('.');
};

export const validaSenha = (senha) => {
  return senha?.length > 5;
};

export const validaConfirmaSenha = (senha, confirmaSenha) => {
  return senha === confirmaSenha;
};

export const validaAvatar = (avatar) => {
  return avatar?.length > 30;
};
export const validaBackGround = (background) => {
  return background?.length > 30;
};



