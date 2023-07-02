<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Requests;
use App\Models\Contact;
use App\Models\RequestType;

class NotifController extends Controller
{
    public function index()
    {
        $requests = Requests::join('contact', 'contact.contactID', '=', 'request.contactID')
                                    ->join('request_type', 'request_type.requestTypeID', '=', 'request.requestTypeID')
                                    ->select('contact.contactNum', 'request_type.requestType')
                                    ->get();

        return view('notifications',['requests' => $requests]);
    }
}
