export interface applicationOK {
  user_id: string;
  username: string;
  start_time: string;
  id: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface earlyReturnHome {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface Accept {
  type: string;
  status: "OK" | "NO";
  ids: string[];
}

export interface ClassProp {
  grade: number;
  class: number;
  type: string;
}

export interface ClubList {
  id: string;
  username: string;
  grade: number;
  class_num: number;
  num: number;
  status: string;
  classroom_name: string;
}

export interface AttendanceChack {
  user_id: string;
  status: string;
}

export interface ChangeStatus {
  user_id: string;
  status: string;
}

export interface FloorClass {
  user_id: string;
  id: string;
  class_num: number;
  classroom_name: string;
  end_period: number;
  grade: number;
  move: string;
  num: number;
  start_period: number;
  username: string;
}

export interface CountOutListType {
  out: number;
  request: number;
  classMove: number;
}

export interface Type {
  grade: number;
  class_num: number;
  num: number;
  name: string;
}
export interface AfterStudent {
  id: string;
  grade: number;
  class_num: number;
  num: number;
  name: string;
  classroom_name: string;
  status: string;
}

export interface ChangeClub {
  user_id: string;
  status_list: string[];
}

export interface changeClass {
  class_num: number;
  classroom_name: string;
  floor: number;
  grade: number;
  id: string;
  num: number;
  move: string;
  user_id: string;
  username: string;
}
