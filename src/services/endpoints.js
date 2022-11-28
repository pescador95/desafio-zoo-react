export const ENDPOINTS = {
  email: "",
  animal: {
    count: "/animal/count",
    add: "/animal/",
    update: "/animal/",
    getById: "/animal/{id}",
    list: "/animal/",
    delete: "/animal/",
    reactive: "/animal/reactive",
    seletor: "/animal/seletor",
  },
  user: {
    count: "/usuario/count",
    add: "/usuario/",
    update: "/usuario/",
    getById: "/usuario/{id}",
    list: "/usuario/",
    delete: "/usuario/",
    reactive: "/usuario/reactive",
    getMyProfile: "/usuario/myprofile",
  },
  nutricao: {
    count: "/nutricao/count",
    add: "/nutricao/",
    update: "/nutricao/",
    getById: "/nutricao/{id}",
    list: "/nutricao/",
    delete: "/nutricao/",
    reactive: "/nutricao/reactive",
  },
  medicacao: {
    count: "/medicacao/count",
    add: "/medicacao/",
    update: "/medicacao/",
    getById: "/medicacao/{id}",
    list: "/medicacao/",
    delete: "/medicacao/",
    reactive: "/medicacao/reactive",
  },
  historicoEtologico: {
    count: "/historicoEtologico/count",
    add: "/historicoEtologico/",
    update: "/historicoEtologico/",
    getById: "/historicoEtologico/{id}",
    list: "/historicoEtologico/",
    delete: "/historicoEtologico/",
    reactive: "/historicoEtologico/reactive",
  },
  historicoClinico: {
    count: "/historicoClinico/count",
    add: "/historicoClinico/",
    update: "/historicoClinico/",
    getById: "/historicoClinico/{id}",
    list: "/historicoClinico/",
    delete: "/historicoClinico/",
    reactive: "/historicoClinico/reactive",
    seletor: "/historicoClinico/seletor",
  },
  enriquecimentoAmbiental: {
    count: "/enriquecimentoAmbiental/count",
    add: "/enriquecimentoAmbiental/",
    update: "/enriquecimentoAmbiental/",
    getById: "/enriquecimentoAmbiental/{id}",
    list: "/enriquecimentoAmbiental/",
    delete: "/enriquecimentoAmbiental/",
    reactive: "/enriquecimentoAmbiental/reactive",
  },
  auth: {
    login: "/auth",
    refresh: "/auth/refresh",
  },
  recoverPassword: "/recoverPassword/",
  uploads: {
    count: "/s3/count",
    add: "/s3/",
    getById: "/s3/{id}",
    list: "/s3/",
    delete: "/s3/{id}",
  },
  download: {
    get: process.env.REACT_APP_API_BASE_URL + "/uploads/{keyname}",
  },
};
