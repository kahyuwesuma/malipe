"use client";

import React, { useEffect, useState } from "react";
import { fetchAllDonations } from "@/utils/fetch/fecthDatabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { ArrowsClockwiseIcon, PaperPlaneTiltIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import SendEmailSheet from "./SendEmailSheet";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDonations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllDonations();
      setDonations(data || []);
    } catch (err) {
      setError("Gagal memuat data donasi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  return (
    <div className="p-6 font-AktivGrotesk-Regular">
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Donasi</CardTitle>
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={loadDonations}
            disabled={loading}
          >
            <ArrowsClockwiseIcon className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Muat Ulang
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <SpinnerIcon className="w-5 h-5 animate-spin mr-2" />
              Memuat data donasi...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-10">{error}</div>
          ) : donations.length === 0 ? (
            <div className="text-gray-500 text-center py-10">
              Belum ada data donasi.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Gambar</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Pesan</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-center">Kirim Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation, index) => (
                    <TableRow key={donation.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {donation.payment_receipt_image ? (
                          <img
                            src={donation.payment_receipt_image}
                            alt={donation.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {donation.name || "-"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {donation.email || "-"}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {donation.message || "-"}
                      </TableCell>
                      <TableCell>
                        {donation.nominal
                          ? `$${Number(donation.nominal).toLocaleString("id-ID")}`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {donation.created_at
                          ? new Date(donation.created_at).toLocaleDateString("id-ID")
                          : "-"}
                      </TableCell>
                      <TableCell className="flex justify-center items-center">
                        <SendEmailSheet email={donation.email} name={donation.name} trigger={<Button className="bg-transparent hover:bg-transparent cursor-pointer border group border-blue-ylbkd"><PaperPlaneTiltIcon className="group-hover:scale-120 transition-all" size={32}/></Button>}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DonationsList