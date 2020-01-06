import { connect as con } from 'dva';
import {
  MapStateToPropsParam,
  MapDispatchToPropsNonObject,
  MapDispatchToPropsParam
} from 'react-redux';
export function connect<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
  mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps?:
    | MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
    | MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return con(mapStateToProps, mapDispatchToProps)(target as any) as any;
  };
}

export function test(): ClassDecorator {
  return (target) => {
    console.log('xx->', Object.getOwnPropertyNames(target.prototype));
  };
}
