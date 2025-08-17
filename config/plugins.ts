export default ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi/provider-upload-aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("MINIO_ACCESS_KEY"),
            secretAccessKey: env("MINIO_SECRET_KEY"),
          },
          region: "us-east-1", // MinIO doesn't use this but Strapi requires it
          endpoint: env("MINIO_ENDPOINT_URL"), // e.g., https://your-minio-app.up.railway.app
          forcePathStyle: true, // IMPORTANT for MinIO
          params: {
            Bucket: env("MINIO_BUCKET"),
          },
        },
        baseUrl: env("MINIO_ENDPOINT_URL"),
      },
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: false,
      landingPage: false, // playgroundAlways
      depthLimit: 8,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "hello@example.com",
        defaultReplyTo: "hello@example.com",
      },
    },
  },
});
