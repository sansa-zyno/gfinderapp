import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { signOut,getAuth,onAuthStateChanged } from "firebase/auth"
import { FaArrowRight,FaSearch} from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home=()=>{
    var [people, setPeople] = useState([]);
    var [peopleFromSearch, setPeopleFromSearch] = useState([]);
    var [searchQuery, setSearchQuery] = useState(""); 
    var [link, setLink] = useState("");
    const navigate = useNavigate();   
    const auth = getAuth();

    useEffect(() => {
      var b = document.getElementById('search');
      b.value="";
      const getPeople = async () => {
        const res = await fetch(`https://api.github.com/users?client_id=38db1580dd3228109235&client_secret=fbe4d7e7353e6932d4229fd57545dc79d62cbfb9&per_page=30`);
        for (var pair of res.headers.entries()) {
          if(pair[0]=="link"){
            console.log(pair[1]);
            const length=pair[1].split(";")[0].length;
            link=pair[1].split(";")[0].substring(1,length);
            setLink(link);
            console.log(link);
          }
        }
        const data = await res.json();
        console.log(data);
        setPeople(data);
      }
      getPeople();

              // auth listener
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        
        // ...
        console.log("uid", uid)
      } else {
        navigate("/")
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    });
  
      }, [])

      const handleLogout = () => {             
        signOut(auth).then(() => {
        // Sign-out successful.
           // navigate("/");
           // console.log("Signed out successfully");
        }).catch((error) => {
        // An error happened.
        })
    }

   var handleSearch=(query) =>{
         setSearchQuery(query);
          people = people.filter((person) =>
          person.login?.toLowerCase().startsWith(query.toLowerCase()) ?? false);
          setPeopleFromSearch(people);
          getUser(query,false);
                  
    }

    const getNext=async(link)=>{
    const res=await fetch(link);
    const data = await res.json();
    console.log(data);
   const peeps=[...people,...data]
    setPeople(peeps);
    for (var pair of res.headers.entries()) {
      if(pair[0]=="link"){
        console.log(pair[1]);
        const length=pair[1].split(";")[0].length;
        link=pair[1].split(";")[0].substring(1,length);
        setLink(link);
         console.log(link);
      }  
    }
    }

    const getUser=async(username,flag)=>{
      /*Check if a username is in github and show. If username is already part people loaded in homepage,empty list before showing to prevent duplicates */ 
      if(username.length<=3){}else{
        const res=await fetch(`https://api.github.com/users/${username}`);
        if(res.status===200){
         const data = await res.json();
          console.log(data);
         if(data.name==null){
          //peopleFromSearch=[];
          //setPeopleFromSearch(peopleFromSearch);
          if(flag==true){
            toast("Sorry, this username does not exist in the github platform!");
          }      
         }else{
           peopleFromSearch=[];
           peopleFromSearch=[data];
           setPeopleFromSearch(peopleFromSearch);
          var a = document.getElementById('anchor');
          a.href=`https://github.com/${username}`
     }
   }else{
    if(flag==true){
      toast("Oops!, this username does not exist in the github platform!");
    }      
   }
}
}
  
    return (
      <div className="container">
      {/* <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img src="" alt=""/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" active="true">
              <a className="nav-link" onClick={handleLogout}>Sign Out</a>
            </li>
             <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#">The developer</a>
                </li>
              <li className="nav-item">
                  <a className="nav-link" href="#">Services</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Connect</a>
                  </li> 
          </ul>
        </div>
      </div>
    </nav> */}
    <header>
      <nav>
      <a onClick={handleLogout}>Sign Out</a>
      </nav>
    </header>
      <section className="content">
      <h1>Github Finder</h1>
      <div className='search'>
      <input id='search'  type="text" name="search" placeholder="search" onChange={(e) =>handleSearch(e.target.value)} />
       <a id='anchor'>
       <FaSearch
        style={{ color: 'blue', cursor: 'pointer',padding:'8' }}
        onClick={()=>getUser(searchQuery,true)}
      />
        </a> 
      </div>
        <ul className="list">    
        {peopleFromSearch.length==0? people.map((person, index) => (
          <li key={index}>
            <div>
            <img className='rounded-image' src={`${person.avatar_url}.png`} alt="Description"/>
            <span className="text">{person.login}</span>
            </div>           
            <a href={`${person.html_url}`}>View Pofile</a>
              
        </li>
        )):peopleFromSearch.map((person, index) => (
          <li key={index}>
            <div>
            <img className='rounded-image' src={`${person.avatar_url}.png`} alt="Description"/>
            <span className="text">{person.login}</span>
            </div>           
            <a href={`${person.html_url}`}>View Pofile</a>
              
        </li>
        )) }   
        </ul>     
       {peopleFromSearch.length==0?<a className='more' onClick={()=>{
          console.log(link);
          getNext(link)}}>More</a> : <a></a> }    
      </section>
      </div>
    ); 
}
export default Home