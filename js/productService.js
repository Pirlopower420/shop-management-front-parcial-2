function getProducts(){
    document.getElementById('info').innerHTML = '<h4>Lista de Productos</h4>'
    document.getElementById('info').innerHTML = ''
    fetch("https://fakestoreapi.com/products", {
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
            let listProducts = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Year</th>
                    <th scope="col">Color</th>
                    <th scope="col">Pantone Value</th>
                    </tr>
                </thead>
                <tbody>
            `


            response.body.forEach(product => {
                listProducts = listProducts.concat(`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.year}</td>
                    <td style="background-color:${product.color}">${product.color}</td>
                    <td>${product.pantone_value}</td>
                </tr>
                    `)
            });
            listProducts = listProducts.concat(`
                <tbody>
            </table>
                `)
                document.getElementById('info').innerHTML = listProducts
        }else{
            document.getElementById('info').innerHTML = '<h3>No se encontraron Productos</h3>'
        }
    })
}