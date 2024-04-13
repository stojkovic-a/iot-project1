using System.ComponentModel;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Lab1Client;

// The port number must match the port of the gRPC server.
var handler = new HttpClientHandler();
handler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true;
using var channel = GrpcChannel.ForAddress("http://localhost:3000");
//var client = new Lab1Server.Lab1ServerClient(channel);
var client = new PowerService.PowerServiceClient(channel);
//var reply = await client.SayHelloAsync(



string unos;

do
{
    Console.WriteLine("\n\tDodaj korisnika - c1");
    Console.WriteLine("\tPreuzmi korisnika - r1");
    Console.WriteLine("\tIzmeni korisnika - u1");
    Console.WriteLine("\tObrisi korisnika - d1");
    Console.WriteLine("\tPreuzmi korisnike - rm");
    Console.WriteLine("\tObrisi korisnike - dm");
    Console.WriteLine("\tPrekini izvrsenje programa - x");
    unos = Console.ReadLine();
    switch (unos)
    {
        
        case "aa":
            await GetValues();
            break;
        case "x": break;
        default: break;
    }
} while (unos != "x");


async Task GetValues()
{

    try
    {
        var call = client.GetFieldForPeriod(new FieldPeriod()
        {
            Field = "Voltage",
            Period = new Period()
            {
                From = "2007-06-30T23:50:00Z"
            }
        });

        await foreach (var resp in call.ResponseStream.ReadAllAsync())
        {
            Console.WriteLine(resp);
        }
        //var response = await client.FindOneAsync(new HeroById()
        //{
        //    A = 10,
        //    B = 10

        //});

        //Console.WriteLine(response.ToString());
    }
    catch (Exception e)
    {
        Console.WriteLine(e);

    }

}

//async Task ObrisiKorisnike()
//{
//    Console.WriteLine("Unesite id korisnika za birsanje, -1 da prekinete unos");

//    var call = client.ObrisiKorisnike();

//    try
//    {
//        var responseTask = Task.Run(async () =>
//        {
//            await foreach (var resp in call.ResponseStream.ReadAllAsync())
//            {
//                Console.WriteLine(resp.ToString());
//            }
//        });

//        while (true)
//        {
//            int id = Int32.Parse(Console.ReadLine());
//            if (id == -1)
//                break;

//            await call.RequestStream.WriteAsync(new Id()
//            {
//                Id_ = id
//            });
//        }

//        await call.RequestStream.CompleteAsync();
//        await responseTask;
//    }
//    catch (Exception e)
//    {
//        Console.WriteLine(e);
//    }
//}

//async Task PreuzmiKorisnike()
//{
//    Console.WriteLine("Uniste donju granicu");
//    int idOd=Int32.Parse(Console.ReadLine());
//    Console.WriteLine("Uniste gornju granicu");
//    int idDo=Int32.Parse(Console.ReadLine());

//    try
//    {
//        var call= client.PreuzmiKorisnike(new IdRange()
//        {
//            OdId = idOd,
//            DoId = idDo
//        });

//        //var responseTask = Task.Run(async () =>
//        //{
//            await foreach (var resp in call.ResponseStream.ReadAllAsync())
//            {
//                Console.WriteLine(resp.ToString());
//            }
//        //});
//    }
//    catch (Exception e)
//    {
//        Console.WriteLine(e);

//    }


//}

//async Task ObrisiKorisnika()
//{
//    Console.WriteLine("Uniste Id korisnika koga zelite da obrisete");
//    int id = Int32.Parse(Console.ReadLine());
//    try
//    {
//        var response = await client.ObrisiKorisnikaAsync(new Id() { Id_ = id });
//        Console.WriteLine(response.ToString());
//    }
//    catch (Exception e)
//    {
//        Console.WriteLine(e);
//    }
//}

//async Task IzmeniKorisnika()
//{
//    Console.WriteLine("Unesite Id, zatim ime, zatim prezime");
//    int id = Int32.Parse(Console.ReadLine());
//    string firstName = Console.ReadLine();
//    string lastName = Console.ReadLine();

//    Console.WriteLine("Da li je poznata adresa korisnika? y/n");
//    string adresaFlag = Console.ReadLine();
//    string adresa = "";
//    if (adresaFlag == "y")
//    {
//        adresa = Console.ReadLine();
//    }

//    Console.WriteLine("Koliko brojeva telefona je poznato?");
//    int numOfPhoneNumbers = Int32.Parse(Console.ReadLine());

//    List<string> phoneNumbers = new List<string>();
//    for (int i = 0; i < numOfPhoneNumbers; i++)
//    {
//        phoneNumbers.Add(Console.ReadLine());
//    }
//    try
//    {
//        var korisnik = new KorisnikMessage()
//        {
//            Id = id,
//            FirstName = firstName,
//            LastName = lastName,
//            Address = adresa,
//        };
//        korisnik.PhoneNumber.AddRange(phoneNumbers);

//        var response = await client.IzmeniKorisnikaAsync(korisnik);
//        Console.WriteLine(response.ToString());
//    }
//    catch (Exception e)
//    {
//        Console.WriteLine(e);
//    }
//}

//async Task PreuzmiKorisnika()
//{
//    Console.WriteLine("Uniste Id korisnika koga zelite da preuzmere");
//    int id=Int32.Parse(Console.ReadLine());
//    try
//    {
//        var response = await client.PreuzmiKorisnikaAsync(new Id() { Id_ = id });
//        Console.WriteLine(response.ToString());
//    }
//    catch(Exception e)
//    {
//        Console.WriteLine(e);
//    }
//}


//async Task DodajKorisnika()
//{
//    Console.WriteLine("Unesite Id, zatim ime, zatim prezime");
//    int id = Int32.Parse(Console.ReadLine());
//    string firstName = Console.ReadLine();
//    string lastName = Console.ReadLine();

//    Console.WriteLine("Da li je poznata adresa korisnika? y/n");
//    string adresaFlag=Console.ReadLine();
//    string adresa = "";
//    if (adresaFlag == "y")
//    {
//        adresa = Console.ReadLine();
//    }

//    Console.WriteLine("Koliko brojeva telefona je poznato?");
//    int numOfPhoneNumbers = Int32.Parse(Console.ReadLine());

//    List<string> phoneNumbers = new List<string>();
//    for (int i = 0;i< numOfPhoneNumbers; i++)
//    {
//        phoneNumbers.Add(Console.ReadLine());
//    }
//    try
//    {
//        var korisnik = new KorisnikMessage()
//        {
//            Id = id,
//            FirstName = firstName,
//            LastName = lastName,
//        };
//        if(adresaFlag == "y")
//        {
//            korisnik.Address = adresa;
//        }
//        korisnik.PhoneNumber.AddRange(phoneNumbers);

//        var response = await client.DodajKorisnikaAsync(korisnik);
//        Console.WriteLine(response.Text);
//    }
//    catch (Exception e)
//    {
//        Console.WriteLine(e);
//    }

//}