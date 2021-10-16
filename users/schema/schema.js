const graphql = require("graphql");
const axios = require("axios");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		posts: {
			type: new GraphQLList(PostType),
			resolve(parentValue) {
				return axios
					.get(
						`https://jsonplaceholder.typicode.com/users/${parentValue.id}/posts`
					)
					.then((res) => res.data);
			},
		},
	}),
});

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		body: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parentValue, args) {
				return axios
					.get(
						`https://jsonplaceholder.typicode.com/users/${parentValue.userId}`
					)
					.then((res) => res.data);
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		post: {
			type: PostType,
			args: { id: { type: GraphQLInt } },
			resolve(parentValue, args) {
				return axios
					.get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
					.then((resp) => resp.data);
			},
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLInt } },
			resolve(parentValue, args) {
				return axios
					.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
					.then((resp) => resp.data);
			},
		},
	},
});

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parentValue, { name, email }) {
				return axios
					.post(`https://jsonplaceholder.typicode.com/users`, {
						name,
						email,
					})
					.then((res) => res.data);
			},
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parentValue, { id }) {
				return axios
					.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
					.then((res) => res.data);
			},
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLInt) },
				name: { type: GraphQLString },
				email: { type: GraphQLString },
			},
			resolve(parentValue, { id, name, email }) {
				return axios
					.patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
						name,
						email,
					})
					.then((res) => res.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
});
