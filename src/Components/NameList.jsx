import React, {useState} from "react";
import uniqid from 'uniqid'

const NameList = () =>{

    const [name,setName] = useState('')
    const [nameList, setNameList] = useState([])
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addName = (e) =>{        
        e.preventDefault()
        if(!name.trim())
        {
            setError('Name is empty')
            return
        }
        const newName = {
            id:uniqid(),
            titleName:name
        }

        setNameList([...nameList,newName])
        setName('')
        setError(null)
    } 

    const deleteName = (id) =>{
        const newArray = nameList.filter(item => item.id !== id)
        setNameList(newArray)
    }

    const [editionMode, setEditionMode] = useState(false)

    const edit = (item) =>{
        setEditionMode(true)
        setName(item.titleName)
        setId(item.id)
    }

    const editName = (e) =>
    {
        e.preventDefault()
        const newArray = nameList
        .map(item => item.id === id ? {id:item.id, titleName:name} : item )
        setNameList(newArray)
        setEditionMode(false)
        setName('')
    }


    return(
        <div>
            <h2>Crud Example</h2>
            <div className="row">
                <div className="col">
                    <h2>Name List</h2>
                    <ul className="list-group">
                        {
                            nameList.map(item => 
                                <li key="{item.id}" className="list-group-item">{item.titleName} 
                                <button onClick={() => {deleteName(item.id)}} className="btn btn-danger float-right">Delete</button>
                                <button onClick={() => {edit(item)}} className="btn btn-info float-right">Edit</button>
                                </li>
                                
                                )
                        }
                    </ul>
                </div>
                <div className = "col">
                    <h2>Form</h2>
                    <form onSubmit={editionMode ? editName : addName} className="form-group">
                        <input onChange={(e)=>{setName(e.target.value)}} className="form-control mb-3" type="text"  placeholder="Enter the name" value={name}/>
                        <input className="btn btn-info btn-block" type="submit" value={editionMode ? 'Edit Name' : 'Register Name'} />
                    </form>
                    {
                        error != null ? (<div className="alert alert-danger">{error}</div>) : (<div> </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default NameList;