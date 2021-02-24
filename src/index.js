const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const sendEmail = require('./sendEmail');





let forms = [{
  id: "form-0",
  name: "Tanjiro",
  phone: "31125468",
  company: "Warcraft",
  email: "ey@fida.com",
  message: "O segredo para a imortalidade , não morra!!"
}]

// 1
let idCount = forms.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => forms,
  },
  Mutation: {
    // 2
    post: (parent, args) => {
       const form = {
        id: `form-${idCount++}`,
        name: args.name,
        phone: args.phone,
        company:  args.company,
        email: args.email,
        message:  args.message

        
      }
     
      sendEmail(form)
   
      forms.push(form);
     
      return form
    },


  },
}


// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => { 
    // Get the user token from the headers.
    const token = req.headers.authorization || true;
 
    // try to retrieve a user with the token
  
  
    // add the user to the context
    return { token }; } 
})


server
  .listen('4001')
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );