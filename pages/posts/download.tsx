import Head from "next/head";
import Link from "next/link";
import Layout from '../../components/layout';
export default function Index() {
  return (
    <div>
      <Link href="/api/download/secret.json">
        Download secret file
      </Link>
    </div>
  );
}
// export default function Index() {  
//   const handleSubmits = async (event: any) => {
//     // Stop the form from submitting and refreshing the page.
//     event.preventDefault()

//     // Get data from the form.
//     const data = {
//       login: event.target.login.value,
//       password: event.target.password.value
//     }

//     const JSONdata = JSON.stringify(data)

//     const endpoint = '/api/download'

//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSONdata,
//     }

//     const response = await fetch(endpoint, options)

//     const result = await response.json();
//     window.open(result.data);

//     // alert(`Is this your full name: ${result.data}`)
//   }

//   return (

//     <Layout>
//     <Head>
//       <title>Formularz</title>
//     </Head>
//     <div>
//       <form onSubmit={handleSubmits}>
//       <ul className="flex-outer">
//       <li>
//         <label htmlFor="login">Login</label>
//         <input type="text" id="login" name="login" required />
//         </li>
//         <li>
//         <label htmlFor="password">password</label>
//         <input type="text" id="password" name="password" required />
//         </li>
       
//         <li>
//         <button type="submit">Submit</button>
//         </li>
//         </ul>
//       </form>
//     </div>
//     </Layout>
//   )  
// }