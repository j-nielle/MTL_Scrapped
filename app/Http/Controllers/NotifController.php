<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Requests;
use App\Models\Contact;
use App\Models\RequestType;

/** NON-SSE */
class NotifController extends Controller
{
    public function index()
    {
        return view('notifications');
    }
}
