import rules, {RulesType} from "./rbacRules";

function check (rules: RulesType, role: string, action: string, data: string) {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

function Can(props: any) { // @TODO
  return check(rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();
}

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

export default Can;