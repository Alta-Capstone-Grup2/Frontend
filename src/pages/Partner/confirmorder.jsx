import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/LayoutAdmin'
import Row from '../../components/Row'
import { BiLeftArrow } from 'react-icons/bi'
import { formatCurrency } from '../../utils/formatCurrency'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { apiWithAuth } from '../../services/api'
import Loading from '../../components/Loading'

const ConfirmOrder = () => {
  const [order, setOrder] = useState()
  const [listClients, setListClients] = useState()
  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')
  const location = useLocation()
  const id = location?.state?.id
  console.log(id)

  const getDetailOrder = async() => {
    apiWithAuth(`orders/${parseInt(id)}`, `GET`, null, "application/json", localStorage.getItem('userToken'))
    .then(res => setOrder(res.data))
    .catch(err => console.log(err))
  }

  const getClients = async() => {
    apiWithAuth(`clients`, `GET`, null, "application/json", localStorage.getItem('userToken'))
    .then(res => setListClients(res.data))
    .catch(err => console.log(err))

  }
    const onDecline = () => {
        Swal.fire({
            title: "Are you sure to decline this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#17345f",
            confirmButtonText: "Yes, Sure",
            cancelButtonColor: "#F47522",
            cancelButtonText: "No, Cancel Decline",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: "center",
                icon: "success",
                text: "Decline Order success",
                showConfirmButton: true,
                timer: 1500,
              });
      
            }
          });
    }

  const onConfirm = async() => {
    Swal.fire({
      title: "You can't cancel this order once you confirm it, Still sure to confirm?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "bozz-three",
      confirmButtonText: "Yes, Sure",
      cancelButtonColor: "#F47522",
      cancelButtonText: "No, Give me a seconds",
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          order_status: "order confirmed"
        }
        apiWithAuth(`partners/orders/${parseInt(id)}/confirm`, `PUT`, body, "application/json", localStorage.getItem('userToken'))
        .then(res => {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Confirm Order success",
            showConfirmButton: true,
            timer: 1500,
          });
        })
      }
    });
          
  }
  
  
  
  useEffect(() => {
    getDetailOrder()
    getClients()
  },[])
  console.log(order)
  return (
    <>
    {order && listClients ? 
    <LayoutAdmin>
        <Link to='/partner/list-order' className='text-bozz-two font-bold flex mb-3 items-center'>
            <BiLeftArrow className='mx-2 text-xl font-bold'/>
            Back To List
        </Link>
        <div className='w-full border border-bozz-one px-8 py-5'>
            <h1 className='text-center text-xl font-bold text-bozz-one mb-3'>Order Information</h1>
            <table className='w-full'>
                <tbody>
                <Row keyName={'event name'} value={order.event_name}/>
                {/* <Row keyName={'client name'} value={clientName}/>
                <Row keyName={'client email'} value={email}/> */}
                <Row keyName={'client city'} value={order.event_location}/>
                <Row keyName={'client address'} value={order.event_address}/>
                <Row keyName={'start date'} value={order.start_date.slice(0,10)}/>
                <Row keyName={'end date'} value={order.end_date.slice(0,10)}/>
                <Row keyName={'service name'} value={order.service_name}/>
                <Row keyName={'service price'} value={formatCurrency(order.service_price)}/>
                <tr className='h-8 w-full text-bozz-one text-sm font-semibold capitalize'>
                    <td className='w-[20%]'>Additional Info</td>
                    <td>:</td>
                </tr>
                </tbody>
            </table>
            <p className='w-full pl-10 font-semibold text-bozz-one text-sm'>
                {order.additional_name} : {formatCurrency(order.additional_price)} x {order.qty} = 
                <span className='ml-12'>{formatCurrency(order.detail_order_total)}</span>
            </p>
            {/* <p className='w-full pl-10 font-semibold text-bozz-one text-sm'>
                Additional 1 x 4 = 
                <span className='ml-12'>{formatCurrency(1400000)}</span>
            </p>
            <p className='w-full pl-10 font-semibold text-bozz-one text-sm'>
                Additional 1 x 4 = 
                <span className='ml-12'>{formatCurrency(1800000)}</span>
            </p> */}
          
            <p className='font-bold text-lg flex justify-between text-bozz-one h-12 border-t-2 border-bozz-one mt-3'>
                <span>Total Order</span>    
                <span>{formatCurrency(order.gross_ammount)}</span>    
            </p>
            <div className='mt-5 flex justify-end text-sm'>
                <button className='h-8 bg-[#EF6D58] text-bozz-six w-32 mx-5 rounded-lg' onClick={onDecline}>Decline Order</button>
                <button className='h-8 bg-bozz-one text-bozz-six w-32 rounded-lg' onClick={onConfirm}>Confirm Order</button>
            </div>
        </div>
    </LayoutAdmin>
    : <Loading/>
  }
    </>
  )
}

export default ConfirmOrder