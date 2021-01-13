import App from "./src/app";
const port = 3333;

App()
  .then(app =>
    app.listen(port, () => console.log(`✔ Server started!! Port: ${port}`))
  )
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
