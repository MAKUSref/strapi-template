export default {
  routes: [
    {
      method: "POST",
      path: "/mailer",
      handler: "mailer.sendEmail",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
