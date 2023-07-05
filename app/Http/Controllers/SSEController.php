<?php

namespace App\Http\Controllers;

use App\Models\RequestNotifs;
use App\Models\OverallMoods;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\Log;

class SSEController extends Controller
{
    public function fetchData()
    {
        $response = new StreamedResponse(function () {
            $this->setSSEHeaders();

            while (true) {
                $notifsData = $this->fetchNotifsFromDB();
                $notifAlert = RequestNotifs::select('created_at')->get();

                $this->sendSSEMessage('newRequest', $notifAlert);
                $this->sendSSEMessage('notifs', $notifsData);
                sleep(1);
            }
        });

        return $response;
    }

    private function sendSSEMessage($event, $data)
    {
        echo "event: $event\n";
        echo "data: $data\n\n";
        //Log::info("SSE: $data[0]");
        ob_flush();
        flush();
    }

    private function fetchNotifsFromDB()
    {
        $notifs = RequestNotifs::orderBy('created_at', 'desc')->get();
        return $notifs->toJson();
    }

    private function fetchOverallFromDB()
    {
        $overall = OverallMoods::all();
        return $overall->toJson();
    }

    private function setSSEHeaders()
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
    }
}