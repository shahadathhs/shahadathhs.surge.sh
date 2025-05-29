"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  Github,
  Linkedin,
  QrCode,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const profileData = {
    name: "Shahadath Hossen Sajib",
    title: "Backend Developer",
    email: "shahadathhossensajib732@gmail.com",
    linkedin: "https://www.linkedin.com/in/shahadathhs",
    phone: "+8801405663070",
    github: "https://github.com/shahadathhs",
    website: "https://shahadathhs.vercel.app",
    resume: "/resume.pdf",
  };

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = JSON.stringify({
          action: "networking",
          linkedin: profileData.linkedin,
          github: profileData.github,
          website: profileData.website,
          name: profileData.name,
          title: profileData.title,
        });
        const url = await QRCode.toDataURL(qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    generateQR();
  }, []);

  const fileId = "1dtZCEgZyof-qrUreeVpXDlOovosegpuf";
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profileData.name}
TITLE:${profileData.title}
EMAIL:${profileData.email}
TEL:${profileData.phone}
URL:${profileData.website}
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profileData.name.replace(" ", "_")}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-10 py-10 px-16 border rounded">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="flex justify-center">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center mb-2">
            Smart QR Networking Card
          </h1>
          <p className="text-center text-muted-foreground">
            Scan the QR code to connect with me instantly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Section */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <QrCode className="h-5 w-5" />
                Scan to Connect
              </CardTitle>
              <CardDescription>
                Point your camera at the QR code to access my networking options
              </CardDescription>
            </CardHeader>
            <CardContent>
              {qrCodeUrl && (
                <div className="flex justify-center mb-4">
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="Networking QR Code"
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                This QR code contains my professional networking information
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Connect with me directly using these options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Link href={profileData.linkedin} target="_blank">
                  <Linkedin className="h-4 w-4 mr-2 inline-block" />
                  View LinkedIn Profile
                </Link>
              </Button>

              <Button className="w-full" variant="outline">
                <Link href={profileData.github} target="_blank">
                  <Github className="h-4 w-4 mr-2 inline-block" />
                  Visit GitHub Profile
                </Link>
              </Button>

              <Button className="w-full" variant="outline">
                <Link
                  href={downloadUrl}
                  download="Shahadath_Hossen_Sajib_Resume.pdf"
                >
                  <Download className="h-4 w-4 inline-block mr-2" />
                  Download Resume
                </Link>
              </Button>

              <Button
                onClick={downloadVCard}
                className="w-full"
                variant="outline"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add to Contacts (.vcf)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
