github.issues.create( { owner: 'foo', repo: 'bar', title: 'baz' } )
.catch(error => {
  console.log(error.name)
  console.log(error.message)
  console.log(Object.keys(error))
})
