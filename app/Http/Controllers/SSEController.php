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

                if(request()->is('/sse-request-alert')){
                    $createdAt = RequestNotifs::select('created_at')->get();
                    $this->sendSSEMessage('createdAt', $createdAt);
                    Log::info("createdAt: $createdAt");
                }
                if(request()->is('/sse-request-table')){
                    $this->sendSSEMessage('notifs', $notifsData);
                    Log::info('request is at /sse-request-table');
                }
                sleep(1);
            }
        });

        return $response;
    }

    private function sendSSEMessage($event, $data)
    {
        echo "event: $event\n";
        echo "data: $data\n\n";
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