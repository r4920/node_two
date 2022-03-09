/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter7656 = { 'updatedBy': { '$in': user } };
      const Blog2251 = await deleteBlog(BlogFilter7656);
      const BlogFilter6685 = { 'addedBy': { '$in': user } };
      const Blog4276 = await deleteBlog(BlogFilter6685);
      const userFilter5834 = { 'addedBy': { '$in': user } };
      const user0024 = await deleteUser(userFilter5834);
      const userFilter6684 = { 'updatedBy': { '$in': user } };
      const user7445 = await deleteUser(userFilter6684);
      const userTokensFilter3283 = { 'userId': { '$in': user } };
      const userTokens8955 = await deleteUserTokens(userTokensFilter3283);
      const userTokensFilter6366 = { 'addedBy': { '$in': user } };
      const userTokens4402 = await deleteUserTokens(userTokensFilter6366);
      const userTokensFilter4136 = { 'updatedBy': { '$in': user } };
      const userTokens7543 = await deleteUserTokens(userTokensFilter4136);
      const roleFilter7996 = { 'addedBy': { '$in': user } };
      const role7408 = await deleteRole(roleFilter7996);
      const roleFilter3552 = { 'updatedBy': { '$in': user } };
      const role9187 = await deleteRole(roleFilter3552);
      const projectRouteFilter7041 = { 'addedBy': { '$in': user } };
      const projectRoute4376 = await deleteProjectRoute(projectRouteFilter7041);
      const projectRouteFilter1833 = { 'updatedBy': { '$in': user } };
      const projectRoute6911 = await deleteProjectRoute(projectRouteFilter1833);
      const routeRoleFilter9788 = { 'addedBy': { '$in': user } };
      const routeRole5226 = await deleteRouteRole(routeRoleFilter9788);
      const routeRoleFilter7476 = { 'updatedBy': { '$in': user } };
      const routeRole5358 = await deleteRouteRole(routeRoleFilter7476);
      const userRoleFilter9854 = { 'userId': { '$in': user } };
      const userRole7040 = await deleteUserRole(userRoleFilter9854);
      const userRoleFilter9752 = { 'addedBy': { '$in': user } };
      const userRole7138 = await deleteUserRole(userRoleFilter9752);
      const userRoleFilter8323 = { 'updatedBy': { '$in': user } };
      const userRole9648 = await deleteUserRole(userRoleFilter8323);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6615 = { 'roleId': { '$in': role } };
      const routeRole9337 = await deleteRouteRole(routeRoleFilter6615);
      const userRoleFilter4758 = { 'roleId': { '$in': role } };
      const userRole7534 = await deleteUserRole(userRoleFilter4758);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter2714 = { 'routeId': { '$in': projectroute } };
      const routeRole0244 = await deleteRouteRole(routeRoleFilter2714);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter0564 = { 'updatedBy': { '$in': user } };
      const Blog6176 = await softDeleteBlog(BlogFilter0564, updateBody);
      const BlogFilter6986 = { 'addedBy': { '$in': user } };
      const Blog1582 = await softDeleteBlog(BlogFilter6986, updateBody);
      const userFilter4343 = { 'addedBy': { '$in': user } };
      const user5008 = await softDeleteUser(userFilter4343, updateBody);
      const userFilter2629 = { 'updatedBy': { '$in': user } };
      const user8591 = await softDeleteUser(userFilter2629, updateBody);
      const userTokensFilter4368 = { 'userId': { '$in': user } };
      const userTokens3911 = await softDeleteUserTokens(userTokensFilter4368, updateBody);
      const userTokensFilter0821 = { 'addedBy': { '$in': user } };
      const userTokens1460 = await softDeleteUserTokens(userTokensFilter0821, updateBody);
      const userTokensFilter7788 = { 'updatedBy': { '$in': user } };
      const userTokens4581 = await softDeleteUserTokens(userTokensFilter7788, updateBody);
      const roleFilter5938 = { 'addedBy': { '$in': user } };
      const role8554 = await softDeleteRole(roleFilter5938, updateBody);
      const roleFilter6432 = { 'updatedBy': { '$in': user } };
      const role7975 = await softDeleteRole(roleFilter6432, updateBody);
      const projectRouteFilter6428 = { 'addedBy': { '$in': user } };
      const projectRoute2895 = await softDeleteProjectRoute(projectRouteFilter6428, updateBody);
      const projectRouteFilter0693 = { 'updatedBy': { '$in': user } };
      const projectRoute5522 = await softDeleteProjectRoute(projectRouteFilter0693, updateBody);
      const routeRoleFilter0888 = { 'addedBy': { '$in': user } };
      const routeRole3952 = await softDeleteRouteRole(routeRoleFilter0888, updateBody);
      const routeRoleFilter8286 = { 'updatedBy': { '$in': user } };
      const routeRole1672 = await softDeleteRouteRole(routeRoleFilter8286, updateBody);
      const userRoleFilter2772 = { 'userId': { '$in': user } };
      const userRole9961 = await softDeleteUserRole(userRoleFilter2772, updateBody);
      const userRoleFilter3129 = { 'addedBy': { '$in': user } };
      const userRole3742 = await softDeleteUserRole(userRoleFilter3129, updateBody);
      const userRoleFilter1169 = { 'updatedBy': { '$in': user } };
      const userRole1402 = await softDeleteUserRole(userRoleFilter1169, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter0222 = { 'roleId': { '$in': role } };
      const routeRole8670 = await softDeleteRouteRole(routeRoleFilter0222, updateBody);
      const userRoleFilter6322 = { 'roleId': { '$in': role } };
      const userRole8453 = await softDeleteUserRole(userRoleFilter6322, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter1777 = { 'routeId': { '$in': projectroute } };
      const routeRole6752 = await softDeleteRouteRole(routeRoleFilter1777, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
