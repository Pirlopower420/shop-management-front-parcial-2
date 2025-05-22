function getUsers(page){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Usarios</h4>'
    fetch("https://fakestoreapi.com/users", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            let listUser = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
            `


            response.body.forEach(user => {
                listUser = listUser.concat(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td><img src="${user.avatar}" alt="Avatar" class="avatar"></td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="showInfoUser('${user.id}')">Info</button>
                    </td>
                </tr>
                    `)
            });
            listUser = listUser.concat(`
                <tbody>
            </table>
               <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="getUsers('1')">1</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="getUsers('2')">2</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
                `)
                document.getElementById('info').innerHTML = listUser
        }else{
            document.getElementById('info')
            .innerHTML = '<h3>No se encontraron Usuarios</h3>'
        }
    })
 
   
}

function showInfoUser(userId){
      fetch("https://reqres.in/api/users/"+userId, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            showModalUser(response.body)
        }
        else{
            document.getElementById('info')
        }
    })
}

function showModalUser(user){
    const modalUser =` 
    <!-- Modal -->
<div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card">
      <img src="${user.avatar}" class="card-img-top" alt="Avatar user">
     <div class="card-body">
         <h5 class="card-title">User info</h5>
         <p class="card-text">First Name : ${user.firts_name}</p>
         <p class="card-text">Last Name : ${user.last_name}</p>
         <p class="card-text">Email : ${user.email}</p>
       
     </div>
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`

document.getElementById('showModalUser').innerHTML = modalUser
const modal = new bootstrap.Modal(
    document.getElementById('modalUser')
)
modal.show()

    
}