import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';



export default function Form() {


  

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      company: event.target.company.value,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    }
    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/form'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json();
    // window.open(result.data);

    alert(`Is this your full name: ${result.data}`)
  }


  return (

    <Layout>
    <Head>
      <title>Formularz</title>
    </Head>
    <div>
      <p>What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <form onSubmit={handleSubmit}>
      <ul className="flex-outer">
      <li>
        <label htmlFor="company">Nazwa placówki</label>
        <input type="text" id="company" name="company" required />
        </li>
        <li>
        <label htmlFor="name">Imię i nazwisko</label>
        <input type="text" id="name" name="name" required />
        </li>
        <li>
        <label htmlFor="phone">Telefon</label>
        <input type="tel" id="phone" name="phone" required />
        </li>
        <li>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        </li>

        <li>
        <button type="submit">Submit</button>
        </li>
        </ul>
      </form>
    </div>
    </Layout>
  )
}
