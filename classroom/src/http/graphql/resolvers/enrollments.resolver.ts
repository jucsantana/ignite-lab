import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CoursesService } from "src/services/courses.service";
import { EnrollmentsService } from "src/services/enrollments.service";
import { StudentsService } from "src/services/students.service";
import { Enrollment } from "../models/enrollment";

@Resolver(()=> Enrollment)
export class EnrollmentsResolver{

    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentsService,
        private coursesService: CoursesService,
    ){}
    
    @Query(()=> [Enrollment])
    @UseGuards(AuthorizationGuard)
    enrollments(){
        return this.enrollmentsService.listAllEnrollments();
    }

    @ResolveField()
    @UseGuards(AuthorizationGuard)
    student(@Parent() enrollment: Enrollment){
      return this.studentsService.findStudentById(enrollment.studentId);
    }
    @ResolveField()
    @UseGuards(AuthorizationGuard)
    course(@Parent() enrollment: Enrollment){
      return this.coursesService.findCourseById(enrollment.courseId)
    }


}