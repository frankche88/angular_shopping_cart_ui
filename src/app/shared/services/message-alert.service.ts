import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MessageAlertHandleService {
    constructor(private toastr: ToastrService) {}

    handleError(err: any) {

        let errorMessage = 'An unknown error has occurred, please try later';

        if (typeof err === 'string') {

            errorMessage = err ;

        } else if (err instanceof Object) {

            errorMessage = err.message;
        }

        this.toastr.error(errorMessage);

    }

    handleSuccess(message: string) {

        this.toastr.success(message);

    }
}
