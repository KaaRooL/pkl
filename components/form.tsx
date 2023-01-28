
import Link from 'next/link';
import styles from './form.module.css';

export default function Form(){
  const handleSubmit = async (event:any) => {
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

    alert(`Dziękujemy za uzupełnienie formularza.`)
  }


  return( 
    <form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles["form-group"]}>
  <label className={styles.label} htmlFor="company">Nazwa placówki</label>
    <input type="text" id="company" name="company" className={styles["form-control"]} required/>
  </div>
  <div className={styles["form-group"]}>
  <label className={styles.label} htmlFor="name">Imię i nazwisko</label>
    <input type="text" id="name" name="name" className={styles["form-control"]} required/>
  </div>
  <div className={styles["form-group"]}>
    <label className={styles.label} htmlFor="email">Email</label>
    <input type="email" id="email" name="email" className={styles["form-control"]} required />
  </div>
  <div className={styles["form-group"]}>
  <label className={styles.label} htmlFor="phone">Telefon</label>
    <input type="tel" id="phone" name="phone" className={styles["form-control"]} required/>
  </div>
  <button type="submit" className={styles.btn}>Wyślij</button>

  <div className={styles["form-group"] + 'permission'}>
  <label className={styles.permission} htmlFor="permission">
    <input type="checkbox" id="permission" name="permission" className={styles["form-control"] + 'permission'} required/>
     Oświadczam, iż zapoznałem się z treścią{" "}
      <Link href="https://www.pkl.pl/polityka-prywatnosci-pkl-n.html">Polityką Prywatności</Link> 
      {" "}oraz{" "}
       <Link href="https://www.pkl.pl/rodo.html">RODO</Link>.
      </label>
  </div>
</form>
    )
}