const Joi = require('joi');
module.exports = {
  // User validation skeleton
  userSchema: Joi.object({
    role_id: Joi.number().required(),
    first_name: Joi.string().min(5).max(30).required(),
    last_name: Joi.string().min(5).max(30).required(),
    // eslint-disable-next-line max-len
    email: Joi.string().required().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
    password: Joi.string().min(6).required(),
    contact_number: Joi.string().required(),
  }),
 
  // Roles validation skeleton
  roleSchema: Joi.object({
    id: Joi.number(),
    name: Joi.string().min(5).max(30).required(),
    slug: Joi.string().min(5).max(30).required(),
    status: Joi.required(),
    permissions: Joi.array(),
  }),
 
  // Login validation skeleton
  loginSchema: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

  // Task validation skeleton
  taskSchema: Joi.object({
    user_id: Joi.string(),
    id: Joi.string(),
    title: Joi.string().required().max(50),
    description: Joi.string().max(300),
    status: Joi.string(),
    type: Joi.string(),
    priority: Joi.string(),
    deadline_time: Joi.date(),
    reminder_time: Joi.date(),
    created_by: Joi.string(),
  }),

  // Comment validation skeleton
  commentSchema: Joi.object({
    id: Joi.string().trim(),
    task_id: Joi.string().trim(),
    title: Joi.string().trim(),
    description: Joi.string().max(500).trim(),
    created_by: Joi.string(),
  }),

  // ip address validation skeleton
  whiteListedIPSchema: Joi.object({
    id: Joi.string(),
    tag: Joi.string().required(),
    created_by: Joi.string(),
    ip: Joi.string()
        .max(45)
        .ip({version: ['ipv4', 'ipv6'], cidr: 'optional'})
        .required(),
    status: Joi.string(),
    // valid ipv6 examples 
    // 2405:204:a489:7264::1ced:90a5
    // 2405:204:a489:7264::
    // 2405:204:a287:ba9b:3a3c:3742::
    // 2405:204:120c:f1e9:d50f:126:fbe8:1be9
    // 2401:4900:1881:76eb:1:1::
    // 2405:205:2285:143f:c002:8a99:869d:906a
    // 2804:18:7806:158f:1:4:5001:c269
    // 2405:204:5788:f757:7630:5432:162c:a388
    // 2405:205:158e:dc35:419f:b6fb::
    // 2405:205:158e:dc35:419f:b6fb:e3e0:852d
  }),
};
