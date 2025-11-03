import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import Clocks from "./components/Clocks";
import Form from "./components/Form";
import Hero from "./components/Hero";
import Layout from "./components/layout/Layout";
import Portal from "./components/Portal";
import Summary from "./components/Summary";
import { calculateTimeLeft, getLifePercentageLived } from "./utils"

function App() {

  const [name, setName] = useState("Patt")
  const [birthDate, setBirthDate] = useState('1993-03-04')
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [showModal, setShowModal] = useState(false)
  const [data,setData] = useState(calculateTimeLeft(birthDate, lifeExpectancy))
  console.log(data)


useEffect(()=>{
  if(!localStorage)return
  if(localStorage.getItem('formData')){
    const {name :n, birthDate:b,lifeExpectancy:e} = JSON.parse(localStorage.getItem('formData'))
    setName(n)
    setBirthDate(b)
    setLifeExpectancy(parseInt(e))
  }
},[])

useEffect(()=>{
  const interval = setInterval(()=>{
    setData(calculateTimeLeft(birthDate,lifeExpectancy))
  },1000)

  return ()=>{
    clearInterval(interval)
  }

},[birthDate,lifeExpectancy])


  function handleToggleModal() {
    setShowModal(!showModal)
    // setShowModal(curr  => !showModal)
  }

  function resetData() {
    setName('James')
    setBirthDate('1995-03-20')
    setLifeExpectancy(100)
    localStorage.clear()
  }

  function handleUpdateData(n, b, e) {
    if (!n || !b || !e) return

    //save data in local storage
    localStorage.setItem('formData', JSON.stringify({ name: n, birthDate: b, lifeExpectancy: e }))
    setName(n)
    setBirthDate(b)
    setLifeExpectancy(parseInt(e))
    handleToggleModal()
  }

  

  const percentage = getLifePercentageLived(birthDate, lifeExpectancy)
  return (
    <Layout >
      {showModal && (
        <Portal handleCloseModal={handleToggleModal}>
          <Form handleUpdateData={handleUpdateData} handleCloseModal={handleToggleModal} name={name} setName={setName} lifeExpectancy={lifeExpectancy} setLifeExpectancy={setLifeExpectancy} />
        </Portal>)}
      <Hero handleToggleModal={handleToggleModal} name={name} data={data} percentage={percentage} resetData={resetData}/>
      <Clocks data={data} />
      <Calendar lifeExpectancy={lifeExpectancy} data={data} />
      <Summary lifeExpectancy={lifeExpectancy} birthDate={birthDate} />
    </Layout>
  )
}

export default App
